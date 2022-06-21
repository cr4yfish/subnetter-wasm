import { useEffect, useRef, useState } from "react";
import { Button, Text, Container, Table, Input, Spacer, Grid, Link, Collapse } from "@nextui-org/react"
import { FaGithub, FaHandPointRight } from "react-icons/fa"
import { MdOutlineFiberNew } from "react-icons/md"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home({}) {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({firstName: "", lastName: "", prefix: 12});

    const columns = [
        {
            key: "name",
            label: "Netzname",
        },
        {
            key: "host_count",
            label: "Hosts",
        },
        {
            key: "ip",
            label: "IP",
        },
        {
            key: "mask",
            label: "Subnetmask",
        },
        {
            key: "first_host",
            label: "First IP",
        },
        {
            key: "last_host",
            label: "Last IP",
        },
        {
            key: "broadcast",
            label: "Broadcast",
        }
    ]

    const renderCell = (item, key) => {
        switch(key) {
            default:
                return (
                    <span onClick={() => {
                        navigator.clipboard.writeText(String(item[key]));
                        toast.info(`Copied ${item[key]} to clipboard`, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            theme: "dark",
                        });
                    }}>{item[key]}</span>
                )
        }
    }

    const workerRef = useRef();

    useEffect(() => {
        if(workerRef.current == undefined) {
            workerRef.current = new Worker(new URL("../lib/worker.js", import.meta.url));
        }
        workerRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setRows(data);
        }
    }, [])

    const CsvTable = () => {
        return (
            <Table
                aria-label='Example table with dynamic content'
                selectionMode="single"
            >
                <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )} 
                </Table.Header>
                <Table.Body items={rows}>
                    {(item) => (
                        <Table.Row key={item.name}>
                            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        )
    }

    const submitHandler = () => {

        // validate form
        if(form.firstName.length > 0 && form.lastName.length > 0 && form.prefix > 0) {
            // workaround to having to click the submit button twice in UI
            workerRef.current.postMessage(form);
            workerRef.current.postMessage(form);
        } else {
            toast.error(`Every field needs to have a value!`, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
        <Container>
            <Spacer/>
            <Grid.Container grap={3}>
                <Grid><Text h1>DNIS Tabellen Rechner</Text></Grid>
                <Container style={{paddingLeft:0}}>
                    <Text h5>Website by <Link href="https://github.com/cr4yfish">Manuel</Link> & Rust Code by <Link href="https://github.com/codinghusi">Gerrit</Link></Text>
                    <Text><Link color="secondary" href="https://github.com/cr4yfish/subnetter-wasm"><FaGithub />&nbsp;Source</Link></Text>
                </Container>
    
            </Grid.Container>
            <Spacer />
            <Collapse bordered arrowIcon={<MdOutlineFiberNew fontSize={30} />} title="Changelog">
                <ul>
                    <li><FaHandPointRight /> Fixed having to click "calculate value" button twice</li>
                    <li><FaHandPointRight /> Changed "prefix" to more accurate name</li>
                    <li><FaHandPointRight /> Added auto-copy when clicking on a cell in the table</li>
                    <li><FaHandPointRight /> Added default value for Suffix</li>
                    <li><FaHandPointRight /> Notification Banner</li>
                    <li><FaHandPointRight /> Added Changelog</li>
                </ul>
            </Collapse>
            
            <Spacer />
            <Grid.Container gap={2} alignItems="center" style={{paddingLeft:0}}>
                <Grid><Input bordered clearable label="First Name" onChange={(e) => setForm({...form, firstName: e.target.value})} required /></Grid>
                <Grid><Input bordered clearable label="Last Name" onChange={(e) => setForm({...form, lastName: e.target.value})} required /></Grid>
                <Grid><Input bordered label="Subnet Suffix" initialValue={12} labelLeft="/" type="number" onChange={(e) => setForm({...form, prefix: parseInt(e.target.value)})}/></Grid>
            </Grid.Container>
            <Spacer />
            <Button shadow onClick={submitHandler}>Calculate Values</Button>
            <Spacer />
        </Container>
        <CsvTable />
        </>
   
        
    )
}