param(
    [int]$Port = 8080,
    [string]$Root = "C:\Users\Legend\.gemini\antigravity\scratch\porsche-911-experience\public"
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://127.0.0.1:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Server started at $prefix"
    Write-Host "Root directory: $Root"
} catch {
    Write-Error "Failed to start HttpListener on $prefix : $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
    ".mp3"  = "audio/mpeg"
    ".wav"  = "audio/wav"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
}

$running = $true

while ($running -and $listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Normalize relative path
        $relPath = $urlPath.TrimStart("/").Replace("/", "\")
        $filePath = [System.IO.Path]::Combine($Root, $relPath)

        if (![System.IO.File]::Exists($filePath)) {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        $ext = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $response.ContentType = $mime
        $response.Headers.Add("Accept-Ranges", "bytes")
        $response.Headers.Add("Access-Control-Allow-Origin", "*")

        $fileInfo = New-Object System.IO.FileInfo $filePath
        $totalLength = $fileInfo.Length

        $rangeHeader = $request.Headers["Range"]

        if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
            # Parse Range header: bytes=start-end
            $rangeVal = $rangeHeader.Substring(6).Trim()
            $parts = $rangeVal.Split("-")

            [long]$start = 0
            [long]$end = $totalLength - 1

            if (![string]::IsNullOrEmpty($parts[0])) {
                $start = [long]::Parse($parts[0])
            }
            if ($parts.Length -gt 1 -and ![string]::IsNullOrEmpty($parts[1])) {
                $end = [long]::Parse($parts[1])
            }

            if ($end -ge $totalLength) {
                $end = $totalLength - 1
            }

            if ($start -gt $end -or $start -ge $totalLength) {
                $response.StatusCode = 416 # Range Not Satisfiable
                $response.Headers.Add("Content-Range", "bytes */$totalLength")
                $response.Close()
                continue
            }

            $lengthToRead = $end - $start + 1
            $response.StatusCode = 206 # Partial Content
            $response.Headers.Add("Content-Range", "bytes $start-$end/$totalLength")
            $response.ContentLength64 = $lengthToRead

            $fs = [System.IO.File]::OpenRead($filePath)
            try {
                $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                $buffer = New-Object byte[] 65536
                [long]$bytesRemaining = $lengthToRead

                while ($bytesRemaining -gt 0) {
                    $toRead = [Math]::Min($buffer.Length, $bytesRemaining)
                    $read = $fs.Read($buffer, 0, $toRead)
                    if ($read -le 0) { break }
                    $response.OutputStream.Write($buffer, 0, $read)
                    $bytesRemaining -= $read
                }
            } finally {
                $fs.Close()
            }
            $response.Close()
        } else {
            $response.StatusCode = 200
            $response.ContentLength64 = $totalLength
            $fs = [System.IO.File]::OpenRead($filePath)
            try {
                $buffer = New-Object byte[] 65536
                while ($true) {
                    $read = $fs.Read($buffer, 0, $buffer.Length)
                    if ($read -le 0) { break }
                    $response.OutputStream.Write($buffer, 0, $read)
                }
            } finally {
                $fs.Close()
            }
            $response.Close()
        }
    } catch {
        # Catch client abort or pipeline termination
    }
}
