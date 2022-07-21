/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const Tooltips = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <span style={{ textDecoration: "underline", color: props.color }} href="#" id="TooltipExample">
                {
                    props.children
                }
            </span>
            <Tooltip placement="bottom" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                {
                    props.info
                }
            </Tooltip>
        </>
    );
}

export default Tooltips;