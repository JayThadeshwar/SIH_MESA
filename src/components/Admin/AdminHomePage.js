import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer/Footer'
import Navbar from '../common/Navbar/Navbar'
import { MDBDataTableV5 } from "mdbreact";
import axios from 'axios';
import { BASE_URI } from '../../constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function AdminHomePage() {
    const [data, setTData] = useState({ columns: [], rows: [] });
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [country, setCountry] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // let rowArr = [
    //     { "id": 1, "email": 'kchaitanya1911@gmail.com', "name": 'CK' }
    // ]
    const columns = [
        {
            label: "code",
            field: "code",
            sort: "disabled",
        },
        {
            label: "name",
            field: "name",
            sort: "disabled",
        },
        {
            label: "country",
            field: "country",
            sort: "disabled",
        },
    ];
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        axios.get(BASE_URI + "/lang").then((res) => {
            console.log(res.data)
            setTData({
                columns: columns,
                rows: res.data,
            });


        })
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);



    }, [])
    return (
        <div>
            {/* <Header></Header> */}
            <Navbar />
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Add language</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setCode(e.target.value)
                                }}
                                value={code}
                                type="text"
                                placeholder="en"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}
                                type="text"
                                placeholder="English"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setCountry(e.target.value)
                                }}
                                value={country}
                                type="text"
                                placeholder="India"
                                autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        axios.post(BASE_URI + '/lang', {
                            "code": code,
                            "name": name,
                            "country": country
                        }).then((res) => {
                            axios.post('http://localhost:5001/api/dialogflow/jsonConvertor', { toLang: code }).then((res) => {
                            }).catch((err) => {
                                console.log(err)
                            })
                            if (res.data.status_code) {
                                window.location.reload()
                            }
                        })
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
            <div style={{ minHeight: '55vh', margin: windowDimensions.width > 1000 ? '30px 200px' : (windowDimensions.width > 780 ? '30px 90px' : '30px 10px') }}>
                <div className="mt-5">
                    <button type="button" class="btn btn-primary btn-sm" style={{ marginBottom: '10px' }} onClick={
                        // axios.post(BASE_URI + '/lang',)
                        handleShow
                    }>ADD</button>
                </div>
                <MDBDataTableV5

                    responsive={true}
                    striped
                    bordered
                    noBottomColumns
                    hover
                    entries={5}
                    data={data}
                    style={{ marginTop: "5px", marginBottom: "0" }}
                />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AdminHomePage