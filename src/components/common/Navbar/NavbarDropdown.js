import React, { useState, useEffect } from 'react'
import Dropdown from 'react-multilevel-dropdown';
import { Form, Row, Col } from 'react-bootstrap';
import i18next from 'i18next';
import { DropdownButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const languages = [
    {
        code: 'hi',
        name: 'हिंदी',
        country: 'IN'
    },
    {
        code: 'mr',
        name: 'मराठी',
        country: 'IN'
    },
    {
        code: 'en',
        name: 'English',
        country: 'IN'
    }
]


const UserIcon = () => {
    const navigate = useNavigate();
    const component = (
        <a className="dropdown-item nav-link" href="#" onClick={() => navigate('/logout')}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30 " fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
            &nbsp;
            Logout
        </a>
    )

    return component;
}

function NavbarDropdown() {
    const [show, setShow] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [isMaleVoice, setIsMaleVoice] = useState(false);
    const [isFemaleVoice, setIsFemaleVoice] = useState(false);
    const [isSelectedMaleVoice, setIsSelectedMaleVoice] = useState(null);
    // const [voiceOptions, setVoiceOptions] = useState({});
    const [data, setData] = useState({});
    const [originOptions, setOriginOptions] = useState([]);
    const [langOptions, setLangOptions] = useState([]);
    const [selectedOriginOption, setSelectedOriginOption] = useState(null);
    const [selectedLangOption, setSelectedLangOption] = useState(null);

    useEffect(() => {
        let langCode = localStorage.getItem('i18nextLng')
        if (langCode) {
            let lang_options = [];

            languages.map(({ code, name, country }) => {
                if (langCode === code) {
                    localStorage.setItem('voice_language', JSON.stringify({ value: langCode, label: name }))
                    setSelectedLangOption({ value: langCode, label: name })
                }
                lang_options.push({ value: code, label: name })
            }
            )
            setLangOptions(lang_options)

            axios.get('http://localhost:5001/api/dialogflow/languageOptions',).then((res) => {
                console.log(res.data[langCode])
                // setVoiceOptions(res.data[langCode])
                setData(res.data)
                settingOriginOptions(res.data[langCode].origins, false)


                // set all default options
                res.data[langCode].origins[0].gender.map((gend) => {
                    if (gend === "MALE") {
                        setIsMaleVoice(true)
                        if (localStorage.getItem('voice_gender') === null) {
                            setIsSelectedMaleVoice(true)
                            localStorage.setItem('voice_gender', 'MALE')
                        }
                    } else if (gend === "FEMALE") {
                        setIsFemaleVoice(true)
                        if (localStorage.getItem('voice_gender') === null) {
                            setIsSelectedMaleVoice(false)
                            localStorage.setItem('voice_gender', 'FEMALE')
                        }
                    } else {
                        setIsFemaleVoice(false);
                        setIsMaleVoice(false);
                        localStorage.removeItem('voice_gender')
                    }
                })
                let voice_speed = localStorage.getItem('voice_speed')
                console.log(voice_speed)
                if (voice_speed === null) {
                    localStorage.setItem('voice_speed', 1)
                    setSpeed(1)
                } else {
                    setSpeed(parseFloat(voice_speed))
                }

            });
        } 
        // else {
        //     alert('No lang Code set')
        // }

        return () => { }
    }, [])

    function settingOriginOptions(data, changeLang) {
        let options = [];
        for (let i = 0; i < data.length; i++) {
            let voice_origin = JSON.parse(localStorage.getItem('voice_origin'))

            if (voice_origin !== null && !changeLang) {
                setSelectedOriginOption(voice_origin)
            }
            else if (i === 0 && changeLang) {
                //
                console.log('yyyyyyyyyyyyyyyyyyyy')
                localStorage.setItem('voice_origin', JSON.stringify({ value: data[i]['language_code'], label: data[i]['origin_name'] }))
                setSelectedOriginOption({ value: data[i]['language_code'], label: data[i]['origin_name'] })
            }

            options.push({ value: data[i]['language_code'], label: data[i]['origin_name'] })
        }
        setOriginOptions(options)

    }


    return (
        <div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="md"
                centered
            >
                <Modal.Header>
                    <Modal.Title >
                        Voice Assistant Settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Select
                                value={selectedLangOption}
                                onChange={(e) => {
                                    i18next.changeLanguage(e.value);
                                    localStorage.setItem('code', e.value)
                                    // setVoiceOptions(data[e.value])
                                    settingOriginOptions(data[e.value].origins, true)
                                    localStorage.setItem('voice_language', JSON.stringify(e))

                                    setSelectedLangOption(e)
                                }}

                                options={langOptions}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">

                            <Form.Label>Origin</Form.Label>

                            <Select
                                value={selectedOriginOption}
                                onChange={(e) => {
                                    // let aa = voiceOptions.origins.filter((voice) => voice.language_code === e.value)
                                    localStorage.setItem('voice_origin', JSON.stringify(e))
                                    setSelectedOriginOption(e)
                                }}
                                options={originOptions}

                            />
                        </Form.Group>
                        {/* <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Gender</Form.Label>
                            <ButtonGroup aria-label="Gender">
                                <Button active={isMaleVoice} onClick={(e) => { setIsMaleVoice(true) }} variant="primary">Male</Button>
                                <Button active={!isMaleVoice} onClick={(e) => { setIsMaleVoice(false) }} variant="primary">Female</Button>
                            </ButtonGroup>
                        </Form.Group> */}

                        {(isMaleVoice || isFemaleVoice) && <Form.Group as={Row}>
                            <Form.Label>
                                Gender
                            </Form.Label>
                            {isMaleVoice && <Col xs="2"><Form.Check
                                type='radio'
                                label='Male'
                                name='gender'
                                checked={isSelectedMaleVoice}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setIsSelectedMaleVoice(true)
                                        localStorage.setItem('voice_gender', 'MALE')
                                    }
                                }}
                            /></Col>}
                            {isFemaleVoice && <Col xs="2">
                                <Form.Check
                                    type="radio" label="Female" name='gender' checked={!isSelectedMaleVoice}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setIsSelectedMaleVoice(false)
                                            localStorage.setItem('voice_gender', 'FEMALE')
                                        }
                                    }}
                                />
                            </Col>}


                        </Form.Group>}
                        <Form.Group as={Row}>
                            <Form.Label>
                                Speed
                            </Form.Label>
                            <Col xs="9">
                                <RangeSlider
                                    min={0.25}
                                    max={2}
                                    step={0.05}
                                    value={speed}
                                    onChange={e => {
                                        localStorage.setItem('voice_speed', e.target.value)
                                        setSpeed(e.target.value)
                                    }}
                                />
                            </Col>
                            <Col xs="3">
                                <Form.Control type='number' min={0.25} step={0.05} max={2} value={speed} onChange={(e) => {
                                    let exact_speed = e.target.value
                                    if (exact_speed > 2) {
                                        exact_speed = 2;
                                    }
                                    setSpeed(exact_speed)
                                    localStorage.setItem('voice_speed', exact_speed)

                                }} />
                            </Col>

                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <DropdownButton size={'md'} align='end' variant="" title={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>}>
                {/* <Dropdown.Item
                > Language
                    <Dropdown.Submenu>
                        {languages.map(({ code, name, country }) =>
                            <Dropdown.Item onClick={() => {
                                i18next.changeLanguage(code);
                                localStorage.setItem('code', code)
                            }}> {name} </Dropdown.Item>)}

                    </Dropdown.Submenu>

                </Dropdown.Item> */}
                <Dropdown.Item onClick={() => { setShow(true) }}>
                    Voice Assistant
                </Dropdown.Item>
                <Dropdown.Item>                
                    <UserIcon />                    
                </Dropdown.Item>
            </DropdownButton>

        </div>
    )
}

export default NavbarDropdown