import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal } from '../modal/Modal';

/**
 * @author Daniel López
 */
export function DroneScheduler() {

    const [drones, setDrones] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        this.setIsOpen(true);
    }

    useEffect(() => {
        axios.get('http://droneschedule-dev-env.eba-msy4dwzg.us-east-1.elasticbeanstalk.com/dispatcher/get-available-drones').then((data) => {
            console.log(data.data.data);
            setDrones(data?.data?.data);
        });
    }, []);

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
                        <td class="drone-cells">{drone.serialNumber}</td>
                        <td class="drone-cells">{drone.model}</td>
                        <td class="drone-cells">{drone.weightLimit}</td>
                    </tr>
                }
                )}
            </tbody>
        </table>
    </div>
    );
}