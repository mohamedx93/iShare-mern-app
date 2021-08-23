import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const CONNECTION_URL = 'mongodb+srv://Maazo:MohZayd1@cluster0.zlyjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

const connectMongoose = () => {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('db connected');
            app.listen(PORT, () => console.log('server running on port: '))
        })
        .catch((error) => console.log(error.messages));

    mongoose.set('useFindAndModify', false);

}
const printMongoConnectionState = () => {
    const connection = mongoose.connection;
    switch (connection.readyState) {
        case 0:
            console.log('disconnected')
            break;

        case 1:
            console.log('connected')

            break;

        case 2:
            console.log('connecting...')

            break;

        case 3:
            console.log('disconnecting...')

            break;

        default:
            console.log('default...')
            break;
    }
}


async function userConnectionPrompt() {
    connectMongoose();
    let timeout = 0;
    while (timeout <= 180000 && mongoose.connection.readyState !== 0 && mongoose.connection.readyState !== 1) {
        printMongoConnectionState();
        await sleep(500);
        timeout += 500;
    }
    printMongoConnectionState();
    rl.question('reconnect to mongodb?: y or n\n', function (response) {
        console.log("response:\t", response)
        if (response !== 'y') rl.close();
        else userConnectionPrompt();
    })
    // prompt.get('reconnect to mongodb?: y or n', (error, result) => {
    //     if (error) return console.error(error);
    //     input = result;
    // });
    // input = prompt('reconnect to mongodb?: y or n\n');
    // console.log('hhhhh')

};


export { printMongoConnectionState, userConnectionPrompt };