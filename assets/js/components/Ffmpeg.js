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

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    }

    useEffect(() => {
        load();
    }, [])

    const convertToGif = async () => {
        // Write the file to memory
        ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

        // Run the ffmpeg command
        await ffmpeg.run("-i", "test.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "out.gif");

        // Read the result
        const data = ffmpeg.FS("readFile", "out.gif");

        // Create URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/gif"}));

        setGif(url);
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
            <input type="file" onChange={e => setVideo(e.target.files?.item(0))} />

            <h3>Result</h3>
            <p><button onClick={convertToGif}>Convert</button></p>
            { gif && <img src={gif} />}
        </div>
    ) : <p>Loading...</p>
}

export default Ffmpeg;