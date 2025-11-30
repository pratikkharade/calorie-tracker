import React from 'react';
import { roundOff } from '../HelpFunctions';

function Table(props) {
    const item = props.data;
    
    return (
        <>
            <div className='item'>
                <div>Crunches</div>
                <div>{`${item[1]} ct.`}</div>
                <div>{`(${roundOff(item[8])} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Walk</div>
                <div>{`${item[2]} miles`}</div>
                <div>{`(${roundOff(roundOff(item[9]))} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Just Fit</div>
                <div>{`${item[3]} mins`} </div>
                <div>{`(${roundOff(item[10])} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Vibration Plate</div>
                <div>{`${item[4]} mins`} </div>
                <div>{`(${roundOff(item[11])} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Planks</div>
                <div>{`${item[5]} secs`} </div>
                <div>{`(${roundOff(item[12])} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Bike</div>
                <div>{`${item[6]} mins`} </div>
                <div>{`(${roundOff(item[13])} Cals)`}</div>
            </div>
            <div className='item'>
                <div>Row</div>
                <div>{`${item[7]} mins`} </div>
                <div>{`(${roundOff(item[14])} Cals)`}</div>
            </div>
            <div className='item total'>
                <div>Total calories</div>
                <div>{`${roundOff(item[15])} Cals`} </div>
                <div>{`(${roundOff(item[15] / 100)} stars)`}</div>
            </div>
        </>
    )
}

export default Table;