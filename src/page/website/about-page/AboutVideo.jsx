import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";

const AboutVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
                {/* Thumbnail */}
                <img
                    src="https://i.ibb.co/ygsN3jk/video-thumbnail.jpg"
                    alt="Video Thumbnail"
                    className="w-full aspect-video object-cover"
                />

                {/* Play Button */}
                <Dialog
                    onOpenChange={(open) => {
                        if (!open) setIsPlaying(false); // stop playing when modal closes
                    }}
                >
                    <DialogTrigger asChild>
                        <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition">
                            <div className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition">
                                <Play className="w-8 h-8 text-[#23A6F0] cursor-pointer " />
                            </div>
                        </button>
                    </DialogTrigger>

                    {/* Modal */}
                    <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            playing={isPlaying}
                            controls
                            width="100%"
                            height="500px"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AboutVideo;
