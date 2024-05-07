import { web } from './app/web.js';

const port = 3000;

web.listen(port, ()=>{
    console.info(`App start at http://localhost:${port}`);
});