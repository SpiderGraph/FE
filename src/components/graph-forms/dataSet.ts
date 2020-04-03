import { GRAPH_WIDTH, GRAPH_HEIGTH } from "../graph/Graph";
// types
import {Leg as LegType} from '../../store/graph/types'

let halfWidth = GRAPH_WIDTH / 2
let halfHeight = GRAPH_HEIGTH / 2


function pts(sideCount:number, radius:number[]) {
    const angle = 360 / sideCount;
    const vertexIndices = range(sideCount);
    return vertexIndices.map((index) => {
        return {
            theta: degreesToRadians(-angle * index),
            r: radius[index],
        };
    });
}

function range(count:number) {
    return Array.from(Array(count).keys());
}

// Convert to radians
function degreesToRadians(angleInDegrees:number) {
    return (Math.PI / 180) * angleInDegrees;
}

// generate coordinates for polygon with the next formula
// nx = (x-cx)*cos(theta) - (y-cy)*sin(theta) + cx
// ny = (y-cy)*cos(theta) + (x-cx)*sin(theta) + cy
function polygon([cx, cy]:[number,number], sideCount:number, radius:number[]) {
    return pts(sideCount, radius)
        .map(({ r, theta }) => {
            if(r > 0){
               return [
                (Math.cos(theta) * (halfWidth - cx)) + (Math.sin(theta) * (r - cy)) + cx,
                (Math.cos(theta) * (r - cy)) - (Math.sin(theta) * (halfWidth - cx)) + cy,
                ]
            }else{
                return [325, 325]
            }
            
    })
        .join(' '); 
}

// Generate position of last point on every leg
export function generateRadius(legs:LegType[]){
    return legs.map(item =>{
        return halfHeight - (item.points.length * 63)
    })
}

export function generatePolygon(legs:LegType[], points:number[] = []) {
    let sideCount = legs.length
    let radius:number[]

    if(points.length > 0){
        radius = new Array(legs.length).fill(0)
        radius.splice(0, points.length, ...points )
    }else {
        radius = generateRadius(legs) 
    }

    // the middle point to rotate around, cx cy
    let cx = halfWidth 
    let cy = halfHeight
    
    return polygon([cx, cy], sideCount, radius)
}

