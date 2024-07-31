import React, { useState } from 'react';
import axios from 'axios';
import '../../../assets/styles/TableSelection.css';
import {
  moveForwardRequest,
  stopRequest,
  rotateLeftRequest,
  rotateRightRequest,
  searchColorRequest,
  returnRequest,
  checkDistanceRequest,
} from '../../../api/request'; // Asegúrate de que la ruta al archivo API es correcta

interface Table {
  id: number;
  color: string;
}

const tables: Table[] = [
  { id: 1, color: 'red' },
  { id: 2, color: 'blue' },
  { id: 3, color: 'green' },
  { id: 4, color: 'yellow' },
];

const TableSelection: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  const handleMoveForward = async () => {
    if (selectedTable) {
      try {
        await moveForwardRequest(selectedTable.id);
        console.log('Move forward command sent');
      } catch (error) {
        console.error('Error sending move forward command:', error);
      }
    }
  };

  const handleStop = async () => {
    try {
      await stopRequest();
      console.log('Stop command sent');
    } catch (error) {
      console.error('Error sending stop command:', error);
    }
  };

  const handleRotateLeft = async () => {
    if (selectedTable) {
      try {
        await rotateLeftRequest(selectedTable.id);
        console.log('Rotate left command sent');
      } catch (error) {
        console.error('Error sending rotate left command:', error);
      }
    }
  };

  const handleRotateRight = async () => {
    if (selectedTable) {
      try {
        await rotateRightRequest(selectedTable.id);
        console.log('Rotate right command sent');
      } catch (error) {
        console.error('Error sending rotate right command:', error);
      }
    }
  };

  const handleSearchColor = async () => {
    if (selectedTable) {
      try {
        await searchColorRequest(selectedTable.color);
        console.log('Search color command sent');
      } catch (error) {
        console.error('Error sending search color command:', error);
      }
    }
  };

  const handleReturn = async () => {
    try {
      await returnRequest();
      console.log('Return command sent');
    } catch (error) {
      console.error('Error sending return command:', error);
    }
  };

  const handleCheckDistance = async () => {
    try {
      await checkDistanceRequest();
      console.log('Check distance command sent');
    } catch (error) {
      console.error('Error sending check distance command:', error);
    }
  };

  return (
    <div className="table-selection-container">
      <h2>Select a Table</h2>
      <div className="tables">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table ${table.color} ${selectedTable?.id === table.id ? 'selected' : ''}`}
            onClick={() => handleTableClick(table)}
          >
            {table.color}
          </div>
        ))}
      </div>
      <button onClick={handleMoveForward} disabled={!selectedTable}>
        Move Forward
      </button>
      <button onClick={handleStop} disabled={!selectedTable}>
        Stop
      </button>
      <button onClick={handleRotateLeft} disabled={!selectedTable}>
        Rotate Left
      </button>
      <button onClick={handleRotateRight} disabled={!selectedTable}>
        Rotate Right
      </button>
      <button onClick={handleSearchColor} disabled={!selectedTable}>
        Search Color
      </button>
      <button onClick={handleReturn} disabled={!selectedTable}>
        Return
      </button>
      <button onClick={handleCheckDistance} disabled={!selectedTable}>
        Check Distance
      </button>
    </div>
  );
};

export default TableSelection;
