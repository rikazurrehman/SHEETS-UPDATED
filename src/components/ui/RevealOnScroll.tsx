import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export const RevealOnScroll = ({
    children,
    width = "fit-content",
    delay = 0,
    className = "",
    direction = "up"
}: RevealOnScrollProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = () => {
        const distance = 50;
        let initial = { opacity: 0, y: 0, x: 0 };

        switch (direction) {
            case "up":
                initial = { opacity: 0, y: distance, x: 0 };
                break;
            case "down":
                initial = { opacity: 0, y: -distance, x: 0 };
                break;
            case "left":
                initial = { opacity: 0, x: distance, y: 0 };
                break;
            case "right":
                initial = { opacity: 0, x: -distance, y: 0 };
                break;
            case "none":
                initial = { opacity: 0, x: 0, y: 0 };
                break;
        }

        return {
            hidden: initial,
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.25, 0.25, 0.75],
                    delay: delay
                }
            }
        };
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};
