import { useEffect, useRef, useState } from "react";
import { Button, Text, Container, Table, Input, Spacer, Grid } from "@nextui-org/react"

export default function Home({}) {
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({firstName: "", lastName: "", prefix: 0});

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
            >
                <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )} 
                </Table.Header>
                <Table.Body items={rows}>
                    {(item) => (
                        <Table.Row key={item.name}>
                            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        )
    }

    return (
        <Container>
            <Container>
            <Spacer/>
            <Grid.Container>
                <Grid><Text h2>DNIS Tabellen Rechner</Text></Grid>
                <Grid><Text h5>Website by <a href="https://github.com/cr4yfish">Manuel</a> & Rust Code by <a href="https://github.com/codinghusi">Gerrit</a></Text></Grid>
                <Grid><Text p><a href="https://github.com/cr4yfish/subnetter-wasm">Source</a></Text></Grid>
            </Grid.Container>
            
            <Spacer />
            <Grid.Container  gap={5}>
                <Grid><Input clearable underlined labelPlaceholder="First Name" onChange={(e) => setForm({...form, firstName: e.target.value})} /></Grid>
                <Grid><Input clearable underlined labelPlaceholder="Last Name" onChange={(e) => setForm({...form, lastName: e.target.value})}/></Grid>
                <Grid><Input clearable underlined labelPlaceholder="Prefix" type="number" onChange={(e) => setForm({...form, prefix: parseInt(e.target.value)})}/></Grid>
            </Grid.Container>
            <Spacer />
            <Button color="secondary" rounded ghost onClick={() => workerRef.current.postMessage(form)}>Calculate Values</Button>
            <CsvTable />
            </Container>

        </Container>
    )
}