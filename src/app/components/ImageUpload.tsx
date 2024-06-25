'use client';

import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

import { Button } from "@radix-ui/themes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconDefinition, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";



export default function ImageUpload({name, icon}:{name:string; icon:IconDefinition}) {

    const fileInRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    async function upload(ev:ChangeEvent<HTMLInputElement>) {

        // first get the input as the type HTMLInputElement
        const input = ev.target as HTMLInputElement;

        if (input && input.files?.length && input.files.length > 0) {
            //console.log("ImageUpload - upload: ", input.files)

            setIsUploading(true);

            // get the image from the files array
            const file = input.files[0];

            // prep the file as form data
            const data = new FormData;
            data.set('file', file);

            // upload using axios
            const response = await axios.post('/api/upload', data);
            console.log("ImageUpload - upload - response: ", response)

            if (response.data.url) {
                setUrl(response.data.url);
                setIsUploading(false);
                setIsImageLoading(true);
            }

        }
       
    }

    const imgLoading = (isUploading || isImageLoading);

    return (
        <>
            <div className='bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center'>
                {imgLoading && (
                    <FontAwesomeIcon icon={faSpinner} className='text-gray-400 animate-spin' />
                )}
                 {(!isUploading) && url && (
                    <Image 
                        src={url} 
                        alt={'upload image'} 
                        width={1024} 
                        height={1024}
                        onLoadingComplete={() => setIsImageLoading(false)}
                        className="w-auto h-auto max-w-24 max-h-24"/>
                )}
                {!imgLoading && !url && (
                    <FontAwesomeIcon icon={icon} className='text-gray-400' />
                )}
                
            </div>
            <input type="hidden" value={url} name={name} />
            <div className='mt-2'>
                <input
                    onChange={upload}
                    ref={fileInRef} 
                    type="file" 
                    className="hidden" 
                />
                <Button 
                    variant="soft"
                    type="button"
                    onClick={() => fileInRef.current?.click()}                    
                >
                    select file
                </Button>
            </div>
        </>
    )
}