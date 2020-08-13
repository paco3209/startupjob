import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function Api() {
    const [jobs, setjobs] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()

    useEffect(() => {
        
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getJobs(variables)
        


    }, [])

    const getJobs =  async (variables) => {
        await Axios.post('/api/jobs/getjobs', variables)
            .then(response => {
                if(response.data.success){
                    if(variables.loadMore){
                        setjobs([...jobs,...response.data.products]) 
                    }else{
                        setjobs(response.data.products)
                    }
                   setPostSize(response.data.postSize)
                }else{
                    alert("Error de carga.")
                }
            })

    }

    return (
        
           <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} data={jobs} mainStyle="padding:1em" valueStyle="font-size:1.5em"></JSONPretty>

        
    )
}

export default Api
