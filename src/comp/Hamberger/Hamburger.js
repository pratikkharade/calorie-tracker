import { useState } from "react";
import "./Hamberger.css";

export default function HamburgerMenu({ onSelect }) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "relative" }}>

            <div className="hamberger-icon" onClick={() => setOpen(true)} >
                <i className="fa-solid fa-bars"></i>
            </div>

            {/* Dropdown menu */}
            {open && (
                <div className="modal-overlay" >
                    <div className="hamberger-dropdown"
                        
                        onClick={(e) => { e.stopPropagation() }}
                    >
                        <div
                            onClick={() => { setOpen(false); onSelect("today"); }}
                            style={{ padding: "8px 0", cursor: "pointer" }}
                        >
                            Today’s Workout
                        </div>

                        <div
                            onClick={() => { setOpen(false); onSelect("history"); }}
                            style={{ padding: "8px 0", cursor: "pointer" }}
                        >
                            Workout History
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}