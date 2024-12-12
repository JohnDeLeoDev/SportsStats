import {style} from '@/app/style'

export default function About() {
    return (
        <div className={style.pageCard}>
            <main className={style.innerCard}>
                <h2 className={style.h2}>About</h2>
                <p className={style.p}>
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>

                <hr className={style.hr}/>
                <p className={style.smallP}>
                    SportsStats is a free app that allows you to search for
                    sports statistics. We currently support the following
                    leagues:
                </p>
                <ul className={style.ul}>
                    <li>MLB Baseball</li>
                </ul>
                <hr className={style.hr}/>
                <p className={style.smallP}>
                    We are a team of Computer Science students at WPI who love
                    sports. SportsStats is our way of combining our passion for
                    sports with our passion for technology. We hope you enjoy
                    using our app as much as we enjoyed building it!
                </p>
                <hr className={style.hr}/>
                <p className={style.smallP}>
                    Made by:
                    <ul className={style.ul}>
                        <li>John DeLeo</li>
                        <li>Matthew Giorgio</li>
                        <li>Christopher Turner</li>
                    </ul>
                </p>
                <hr className={style.hr}/>
                <h2 className={style.h2}>Our Technology</h2>
                <p className={style.smallP}>
                    SportsStats is built with the following technologies:
                </p>
                <ul className={style.ul}>
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>Node.js</li>
                    <li>PostgreSQL</li>
                    <li>Typescript</li>
                    <li>Python</li>
                    <li>AWS:</li>
                    <ul className={style.ul + 'ml-4 mt-0'}>
                        <li>EC2</li>
                        <li>RDS</li>
                        <li>S3</li>
                        <li>Cognito</li>
                        <li>Lambda</li>
                        <li>Amplify</li>
                    </ul>
                </ul>
            </main>
        </div>
    )
}
