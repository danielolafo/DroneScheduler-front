import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from '../modal/Modal';

/**
 * @author Daniel López
 */
export function DroneScheduler() {

    const [drones, setDrones] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDrone, setSelectedDrone] = useState();

    const openModal = () => {
        console.log('Open modal');
        console.log('Selected drone', selectedDrone);
        setIsOpen(true);
    }

    const handleClose = () => {
        console.log('Close modal');
        setIsOpen(false);
    }

    useEffect(() => {
        axios.get('http://dronschedule-back-dev.eba-t2eumvzz.us-east-1.elasticbeanstalk.com/dispatcher/get-available-drones').then((data) => {
            setDrones(data?.data?.data);
        });
    }, []);

    function selectRow(drone){
        console.log('Selected before drone is: ',drone);
        setSelectedDrone(drone);
        console.log('Selected drone is: ',drone);
    }

    return (<div>
        <table class="drone-table center-content">
            <thead>
                <tr>
                    <th class="drone-cells">Serial number</th>
                    <th class="drone-cells">Model</th>
                    <th class="drone-cells">Weight limit</th>
                </tr>
            </thead>
            <tbody>
                {drones.map((drone, idx) => {
                    return <tr key={drone.id}>
                        <td class="drone-cells" onClick={openModal}>{drone.serialNumber}</td>
                        <td class="drone-cells">{drone.model}</td>
                        <td class="drone-cells">{drone.weightLimit}</td>
                        <td><button onClick={()=>selectRow(drone)}>View details</button></td>
                    </tr>
                }
                )}
            </tbody>
        </table>
        <Modal isOpen={isOpen} onClose={handleClose}>
            <h1>Details</h1>
            <form>
                <div>
                    <div>
                        <label for="serialNumber">Serial</label>
                        <input type="text" disabled="true" id='serialNumber' value={selectedDrone?.serialNumber} />
                    </div>
                    <div>
                        <label for="model">Model</label>
                        <input type="text" disabled="true" id='model' value={selectedDrone?.model} />
                    </div>
                    <div>
                        <label for="weightLimit">Weight limit</label>
                        <input type="text" disabled="true" id='weightLimit' value={selectedDrone?.weightLimit} />
                    </div>
                </div>
            </form>
        </Modal>
    </div>

    );
}