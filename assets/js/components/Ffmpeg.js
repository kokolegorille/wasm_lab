// https://www.youtube.com/watch?v=-OTc0Ki7Sv0&list=PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb&index=4

import React, { useState, useEffect } from "react";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ 
    // CDN
    // corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',

    // Put ffmpeg-core files inside static/js
    corePath: '/js/ffmpeg-core.js',
    log: true,
});

const Ffmpeg = () => {
    const [ready, setReady] = useState(false);
    const [video, setVideo] = useState();
    const [gif, setGif] = useState();
    const [poster, setPoster] = useState();

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    }

    useEffect(() => {
        load();
    }, [])

    const loadFile = e => {
        const file = e.target.files?.item(0);
        //console.log("FILE", file);

        const filereader = new FileReader();

        filereader.onloadend = evt => {
            if (evt.target.readyState === FileReader.DONE) {
                const uint = new Uint8Array(evt.target.result);
                let bytes = [];
                uint.forEach(byte => {
                    bytes.push(byte.toString(16))
                })
                const hex = bytes.join('').toUpperCase();

                console.log("Mime Type : ", getMimeType(hex));
            }
        }

        const blob = file.slice(0, 4);
        filereader.readAsArrayBuffer(blob);

        setVideo(file);
    }

    const getMimeType = signature => {
        console.log("File Signature : ", signature);
        switch (signature) {
            case '89504E47':
                return 'image/png'
            case '47494638':
                return 'image/gif'
            case '25504446':
                return 'application/pdf'
            case 'FFD8FFDB':
            case 'FFD8FFE0':
                return 'image/jpeg'
            case '504B0304':
                return 'application/zip'
            default:
                return 'Unknown filetype'
        }
    }

    const convertToGif = async () => {
        // Write the file to memory
        ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

        // Run the ffmpeg command
        // await ffmpeg.run("-i", "test.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "out.gif");

        await ffmpeg.run("-i", "test.mp4", "-t", "5.0", "-ss", "10.0", "-f", "gif", "out.gif");

        // NOT WORKING...
        // await ffmpeg.run(
        //     "-i", "test.mp4", 
        //     "-t", "5.0", 
        //     "-filter_complex", "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse", 
        //     "-f", "gif", "out.gif");

        // Read the result
        const data = ffmpeg.FS("readFile", "out.gif");

        // Create URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/gif"}));

        setGif(url);
    }

    const convertToPoster = async () => {
        // Write the file to memory
        ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

        // Run the ffmpeg command
        await ffmpeg.run("-i", "test.mp4", "-ss", "10.0", "-frames:v", "1", "poster.jpg");

        // Read the result
        const data = ffmpeg.FS("readFile", "poster.jpg");

        // Create URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/jpg"}));

        setPoster(url);
    }

    return ready ? (
        <div>
            {
                video &&
                <div>
                    <video
                        controls
                        width="360"
                        src={URL.createObjectURL(video)} >
                    </video>
                </div>
            }
            <input type="file" onChange={loadFile} />

            <h3>Gif</h3>
            <p><button onClick={convertToGif}>Convert to GIF</button></p>
            { gif && <img src={gif} />}

            <h3>Poster</h3>
            <p><button onClick={convertToPoster}>Convert to Poster</button></p>
            { poster && <img src={poster} />}
        </div>
    ) : <p>Loading...</p>
}

export default Ffmpeg;