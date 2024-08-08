import app from './app.js'
import { PORT } from './config.js'

console.log(`Server listening on port ${PORT}`);

app.listen(PORT)
