import {
    useJsonToCsv
} from 'react-json-csv';

import { Button } from "@nextui-org/react"

export default function CSVConvert({ data, cols, filename }) {
    const { saveAsCsv } = useJsonToCsv();

    return (
        <Button color="secondary" shadow onClick={saveAsCsv({ data, cols, filename })}>Download CSV</Button>
    )
};