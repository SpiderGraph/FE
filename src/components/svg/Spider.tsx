import React, { FunctionComponent } from 'react'

type Props = {
    position: {x: number, y:number},
    rotation: number,
    color: string
}

const Spider:FunctionComponent<Props> = ({position, rotation, color}) =>{
    return(
         <svg x={position.x} y={position.y} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform={`rotate(${rotation} 18 18)`} style={{transition: `all 0.5s ease-out`}}>
                <path d="M18.1876 10.456C17.0087 11.232 18.5052 12.051 19.0102 12.3273C19.5152 12.6037 20.6018 11.9514 21.1869 10.8257C21.772 9.70002 21.634 8.52718 21.129 8.25082C20.2316 7.75974 19.3665 9.67993 18.1876 10.456Z" fill={color} />
                <path d="M16.6785 10.7197C17.8534 11.5772 16.1358 12.3281 15.5561 12.5815C14.9765 12.8348 13.8856 12.1087 13.3954 10.928C12.9052 9.74736 13.2013 8.55927 13.781 8.30589C14.811 7.85562 15.5037 9.86212 16.6785 10.7197Z" fill={color} />
                <ellipse cx="17.3114" cy="13.0701" rx="3.00171" ry="3.43001" fill="#FFBC6C"/>
                <ellipse cx="16.0834" cy="11.8801" rx="0.545765" ry="0.560001" fill="#6A4848"/>
                <ellipse cx="18.5393" cy="11.8801" rx="0.545765" ry="0.560001" fill="#6A4848"/>
                <ellipse cx="15.1964" cy="12.9301" rx="0.341103" ry="0.350001" fill="#6A4848"/>
                <ellipse cx="19.4262" cy="12.9301" rx="0.341103" ry="0.350001" fill="#6A4848"/>
                <line x1="0.5" y1="-0.5" x2="2.89443" y2="-0.360977" transform="matrix(0.844108 0.536174 -0.516578 0.85624 11.4445 14.54)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="8.77716" y2="-0.36309" transform="matrix(0.352973 0.935633 -0.929373 0.369142 8.1698 6)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="2.39561" y2="-0.381269" transform="matrix(0.986177 0.0930182 -0.0785392 1.00606 11.516 17.6489)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="7.42598" y2="-0.383255" transform="matrix(0.726559 0.677077 -0.660831 0.759977 5.81018 12.3899)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="2.83672" y2="-0.386563" transform="matrix(0.986711 -0.132917 -0.481616 -0.883422 8.98938 19.8906)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="6.50321" y2="-0.358495" transform="matrix(0.696911 -0.709583 -0.875998 -0.488484 4.13257 24.7651)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="3.25259" y2="-0.366715" transform="matrix(0.897179 -0.442921 -0.662514 -0.748087 9.55933 22.4771)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="7.91325" y2="-0.342406" transform="matrix(0.438675 -0.899314 -0.968538 -0.247304 5.86536 29.9231)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="3.22693" y2="-0.355726" transform="matrix(-0.872654 0.488339 0.56502 0.825077 23.5502 14.6802)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="8.94237" y2="-0.346984" transform="matrix(-0.393644 0.919263 0.94388 0.330287 27.2671 6.13989)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="2.64263" y2="-0.37537" transform="matrix(-1.03141 0.0857066 0.0849296 0.958451 23.469 17.7893)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="7.72781" y2="-0.371911" transform="matrix(-0.794454 0.65224 0.683666 0.692668 29.9456 12.53)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="3.20533" y2="-0.379175" transform="matrix(-1.00858 -0.119695 0.513248 -0.829402 26.3365 20.0305)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="6.78169" y2="-0.341539" transform="matrix(-0.760801 -0.682446 0.887937 -0.436215 31.8496 24.9055)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="3.67568" y2="-0.359024" transform="matrix(-0.91519 -0.398043 0.710985 -0.707276 25.6898 22.6172)" stroke={color} stroke-linecap="square"/>
                <line x1="0.5" y1="-0.5" x2="8.17038" y2="-0.322658" transform="matrix(-0.483166 -0.872643 0.97695 -0.219765 29.8828 30.063)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.7689 18.5302C22.5072 17.7403 21.8998 16.9254 21.2884 16.2498C20.2951 15.1524 18.8255 14.6802 17.3453 14.6802C15.8651 14.6802 14.3955 15.1524 13.4023 16.2498C12.7909 16.9254 12.1835 17.7403 11.9218 18.5302C11.3731 20.1867 11.1363 21.4573 11.9218 23.0102C12.9935 25.1289 15.0531 25.4713 17.3795 25.4602C19.6814 25.4492 21.7054 25.1051 22.7689 23.0102C23.5566 21.4585 23.3176 20.1867 22.7689 18.5302Z" fill="#B42C2C"/>
                <line x1="0.5" y1="-0.5" x2="4.95813" y2="-0.5" transform="matrix(-0.435635 0.900123 -0.909939 -0.414742 18.071 17.0923)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="0.5" y1="-0.5" x2="4.95813" y2="-0.5" transform="matrix(-0.881543 -0.472104 0.492326 -0.870411 19.9572 20.4812)" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
    )
}

export default Spider