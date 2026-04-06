import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./style.module.css";
import { getTranslateVariants, getBlurVariants } from "./anim";
type LinkType = {
    title: string;
    href: string;
};

type SelectedLinkType = {
    isActive: boolean;
    index: number;
};

type BodyProps = {
    links: LinkType[];
    selectedLink: SelectedLinkType;
    setSelectedLink: (link: SelectedLinkType) => void;
    setIsActive: (active: boolean) => void;
    reducedMotion: boolean;
};

export default function Body({ links, selectedLink, setSelectedLink, setIsActive, reducedMotion }: BodyProps) {
    const translate = getTranslateVariants(reducedMotion)
    const blur = getBlurVariants(reducedMotion)

    const getChars = (word: string) => {
        const chars = word.split("").map((char, i) => (
            <motion.span
                custom={[i * 0.02, (word.length - i) * 0.01]}
                variants={translate}
                initial="initial"
                animate="enter"
                exit="exit"
                key={char + i}
                className="satoshi"
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ));
        return chars;
    };

    return (
        <div className={`${styles.body} w-full flex justify-center pt-0 z-[50]`}>
            <div className='outline outline-white rounded-3xl w-[90svw] md:w-[85svw] lg:w-[95svw] min-h-24 p-5 text-lg bg-black mt-5 mb-5 flex flex-col text-white'>
                    {links.map((link, index) => {
                        const { title, href } = link;
                        return (
                            <Link 
                                key={`l_${index}`} 
                                href={href} 
                                className="w-full"
                                onClick={() => setIsActive(false)}
                            >
                                <motion.p
                                    onMouseOver={() => {    
                                        setSelectedLink({ isActive: true, index });
                                    }}
                                    onMouseLeave={() => {
                                        setSelectedLink({ isActive: false, index });
                                    }}
                                    variants={blur}
                                    animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}
                                >
                                    {getChars(title)}
                                </motion.p>
                            </Link>
                        );
                    })}
                </div>
        </div>
    );
}
