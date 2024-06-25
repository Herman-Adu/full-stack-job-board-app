'use client'

import { useState } from 'react';
import { Button, RadioGroup, TextArea, TextField, Theme } from '@radix-ui/themes';

import {faEnvelope, faMobile, faPhone, faStar, faUser} from '@fortawesome/free-solid-svg-icons';

import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from 'react-country-state-city';

import 'react-country-state-city/dist/react-country-state-city.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageUpload from './ImageUpload';

export default function  JobForm() {
    const [countryId, setCountryId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [cityId, setCityId] = useState(0);

    return (
        <Theme>
            <form 
                action=''
                className='container mt-6 flex flex-col gap-4'
            >
                {/* {JSON.stringify(props)} */}
                <TextField.Root name='title' placeholder='Job title' />                
                <div className='grid grid-cols-3 gap-6 *:grow'>
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue='hybrid' name='remote'>
                            <RadioGroup.Item value='onsite'>On-site</RadioGroup.Item>
                            <RadioGroup.Item value='hybrid'>Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value='remote'>Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Full time?
                        <RadioGroup.Root defaultValue='full' name='type'>
                            <RadioGroup.Item value='project'>Project</RadioGroup.Item>
                            <RadioGroup.Item value='part'>Part-time</RadioGroup.Item>
                            <RadioGroup.Item value='full'>Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Salary
                        <TextField.Root name='salary'>
                            <TextField.Slot>
                                £
                            </TextField.Slot> 
                            <TextField.Slot>
                                k/year
                            </TextField.Slot>
                        </TextField.Root>
                        
                    </div>
                </div>
                <div>
                    loaction?
                    <div className='flex gap-4 *:grow'>
                        <CountrySelect
                            onChange={(e:any) => {
                                setCountryId(e.id);
                            }}
                            placeHolder='Select Country'
                        />
                        <StateSelect
                            countryid={countryId}
                            onChange={(e:any) => {
                                setStateId(e.id);
                            }}
                            placeHolder='Select State'
                        />
                        <CitySelect
                            countryid={countryId}
                            stateid={stateId}
                            onChange={(e:any) => {
                                setCityId(e.id);
                            }}
                            placeHolder='Select City'
                        />
                    </div>                        
                </div>
                <div className='flex'>
                    <div className='w-1/3'>
                        <h3>Job icon</h3>
                        <ImageUpload name='jobIcon' icon={faStar} />
                    </div>
                    <div className='grow'>
                        <h3>contact person</h3>
                        <div className='flex gap-2'>
                            <div className=''>
                                <ImageUpload name='personPhoto' icon={faUser} />
                            </div>
                            <div className='grow flex flex-col gap-1'>
                                <TextField.Root placeholder='John Doe' name='name'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} className='text-gray-400' />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder='phone' name='phone'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} className='text-gray-400' />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder='Email' name='email'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope} className='text-gray-400' />
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>
                <TextArea placeholder='Job description' resize='vertical' name='description' />
                <div className='flex justify-center'>
                    <Button size='3'><span className='px-8'>Save</span></Button>
                </div>
            </form>
        </Theme>
    );
}