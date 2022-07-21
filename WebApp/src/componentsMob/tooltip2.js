/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const Tooltips2 = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <span style={{ textDecoration: "underline", color: props.color }} href="#" id="TooltipExamples">
                {
                    props.children
                }
            </span>
            <Tooltip placement="bottom" isOpen={tooltipOpen} target="TooltipExamples" toggle={toggle}>
                {
                    props.info
                }
            </Tooltip>
        </>
    );
}

export default Tooltips2;