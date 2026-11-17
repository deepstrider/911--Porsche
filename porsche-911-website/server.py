"""
Porsche 911 Carrera — High Performance Streaming HTTP Server
Serves static assets with full HTTP 206 Partial Content (Range request) support for smooth video seeking.
"""

import os
import sys
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 8080
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

mimetypes.init()
mimetypes.add_type('video/mp4', '.mp4')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

class RangeRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        url_path = self.path.split('?')[0].split('#')[0]
        if url_path == '/' or url_path == '':
            url_path = '/index.html'

        rel_path = url_path.lstrip('/')
        file_path = os.path.join(PUBLIC_DIR, rel_path.replace('/', os.sep))

        if not os.path.exists(file_path) or os.path.isdir(file_path):
            self.send_error(404, f"File Not Found: {url_path}")
            return

        file_size = os.path.getsize(file_path)
        content_type, _ = mimetypes.guess_type(file_path)
        if not content_type:
            content_type = 'application/octet-stream'

        range_header = self.headers.get('Range')

        if range_header and range_header.startswith('bytes='):
            # Parse Range: bytes=start-end
            byte_range = range_header[6:].strip()
            parts = byte_range.split('-')
            
            try:
                start = int(parts[0]) if parts[0] else 0
                end = int(parts[1]) if len(parts) > 1 and parts[1] else file_size - 1
            except ValueError:
                self.send_error(400, "Invalid Range Header")
                return

            if start >= file_size or end >= file_size or start > end:
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{file_size}')
                self.end_headers()
                return

            content_length = end - start + 1
            self.send_response(206)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
            self.send_header('Content-Length', str(content_length))
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            with open(file_path, 'rb') as f:
                f.seek(start)
                bytes_to_send = content_length
                chunk_size = 64 * 1024
                while bytes_to_send > 0:
                    read_len = min(bytes_to_send, chunk_size)
                    chunk = f.read(read_len)
                    if not chunk:
                        break
                    try:
                        self.wfile.write(chunk)
                    except (BrokenPipeError, ConnectionResetError):
                        break
                    bytes_to_send -= len(chunk)
        else:
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(file_size))
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            with open(file_path, 'rb') as f:
                chunk_size = 64 * 1024
                while True:
                    chunk = f.read(chunk_size)
                    if not chunk:
                        break
                    try:
                        self.wfile.write(chunk)
                    except (BrokenPipeError, ConnectionResetError):
                        break

    def log_message(self, format, *args):
        # Concise logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {args[0]} {args[1]} {args[2]}\n")

if __name__ == '__main__':
    port = PORT
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, RangeRequestHandler)
    print(f"Porsche 911 Experience Server running at http://127.0.0.1:{port}/")
    print(f"Serving from: {PUBLIC_DIR}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
