import 'dotenv/config';
import { createClient } from 'redis';
import * as nodemailer from 'nodemailer';

const channel = 'myappNoteEvents';

async function main() {
    const subscriber = createClient({url:process.env.REDIS_EVENTS_URI});
    subscriber.connect();
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
    });
    console.log("Starting to listen to new messages from redis channel");
    subscriber.subscribe(channel, async (message) => {
        const noteEvent = JSON.parse(message);
        const eventJson = JSON.stringify(noteEvent, null, 2)
        let info = await transporter.sendMail({
            from: '"Notes app" <notes@myapp.com>',
            to: "foo@example.com, foo@example.com",
            subject: "New note " + noteEvent.eventType,
            text: "The note event: " + eventJson, 
            html: "The note event: <pre>" + eventJson + "</pre>", 
          });
        console.log("Got new event! see email in: %s", nodemailer.getTestMessageUrl(info));        
    });
  
}

main().catch(console.error);