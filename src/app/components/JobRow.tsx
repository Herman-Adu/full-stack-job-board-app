'use client'

import TimeAgo from "@/app//components/TimeAgo";
import type { Job } from "@/models/Job";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";


export default function JobRow({jobDoc}:{jobDoc:Job}) {
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="absolute cursor-pointer top-4 right-4">
                    <FontAwesomeIcon className="size-4 text-gray-400" icon={faHeart} />
                </div>
                <div className="flex grow gap-4"> 
                    <div className="content-center">
                        <img
                            className="size-12"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                            alt="" 
                        />
                    </div>
                    <div className="sm:flex grow">
                        <div className="grow">
                            <div>
                                <Link href={`/jobs/${jobDoc.orgId}`} className="text-gray-500 text-sm">{jobDoc.orgName || '?'}</Link>
                            </div>
                            
                            <div className="font-bold text-lg mb-1">{jobDoc.title}</div>
                            <div className="text-gray-400 text-sm capitalize">
                                {jobDoc.remote}
                                {' '}&middot;{' '}
                                {jobDoc.city}, {jobDoc.country}
                                {' '}&middot;{' '}
                                {jobDoc.type}-time
                                {jobDoc.isAdmin && (
                                    <>
                                        {' '}&middot;{' '}
                                        <Link href={'/jobs/edit/' + jobDoc._id}>Edit</Link>
                                        {' '}&middot;{' '}
                                        <button 
                                            type="button" 
                                            onClick={async () => {
                                                await axios.delete('/api/jobs?id='+jobDoc._id);
                                                window.location.reload();
                                            }}>                                        
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>     
                        </div> 
                        {jobDoc.createdAt && (
                            <div className="content-end text-gray-500 text-sm">
                                 <TimeAgo createdAt={jobDoc.createdAt} />
                            </div> 
                        )} 
                                                
                    </div>
                </div>             
            </div>
        </>
    )
   
}