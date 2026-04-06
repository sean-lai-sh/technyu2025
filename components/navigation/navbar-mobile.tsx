import { motion } from 'framer-motion';
import React, { useState } from 'react'
import styles from './navigation.module.css'
import Body from './mobile-body/nav_body';
import { height } from './mobileanim';
import { satoshi } from '@/lib/fonts';

type NavbarMobileProps = {
    setIsActive: (active: boolean) => void;
}

const NavbarMobile = ({ setIsActive }: NavbarMobileProps) => {
    const links = [
        {
            title: "Team",
            href: "/team",
        },
        {
            title: "Press",
            href: "/press",
        },
        // {
        //     title: "About Us",
        //     href: "/about",
        // },
        {
            title: "Startup Week",
            href: "/programs/startup-week",
        },
        {
            title: "Tech Treks",
            href: "/programs/tech-treks",
        },
        {
            title: "Mentorship",
            href: "/programs/mentorship",
        },
        {
            title: "Dev Team",
            href: "/programs/dev-team",
        },
        {
            title: "Contact",
            href: "/contact",
        }
    ];


    const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});
    return (
        <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={`${satoshi.variable} overflow-hidden w-full md:hidden flex justify-center`}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body
                      links={links}
                      selectedLink={selectedLink}
                      setSelectedLink={setSelectedLink}
                      setIsActive={setIsActive}
                    />
                    {/* <Footer /> */}
                </div>
            </div>
        </motion.div>
    )
}

export default NavbarMobile
