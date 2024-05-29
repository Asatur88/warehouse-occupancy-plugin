import axios from 'axios';

export function createOccupancyWidget(elementId, apiEndpoint) {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error('Element not found');
  }

  container.innerHTML = `
    <div class="counter-card">
      <div class="corner-ribbon">СК Солнцево</div>
      <div class="icon">
        <i class="fas fa-users"></i>
      </div>
      <div class="count" id="occupancy-count">Загрузка...</div>
      <div class="label">Текущая численность</div>
    </div>
  `;

  async function fetchOccupancy() {
    try {
      const response = await axios.get(apiEndpoint);
      document.getElementById('occupancy-count').innerText = response.data.count;
    } catch (error) {
      console.error('Error fetching occupancy:', error);
      document.getElementById('occupancy-count').innerText = 'Ошибка';
    }
  }

  fetchOccupancy();
  setInterval(fetchOccupancy, 60000); // Update every minute
}

const styles = `
  .counter-card {
    width: 250px;
    padding: 20px;
    background-color: #e74c3c;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .counter-card .icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  .counter-card .count {
    font-size: 3rem;
    margin-bottom: 5px;
  }
  .counter-card .label {
    font-size: 1.2rem;
  }
  .corner-ribbon {
    width: 100px;
    background: #c0392b;
    position: absolute;
    top: 20px;
    left: -20px;
    text-align: center;
    line-height: 20px;
    letter-spacing: 1px;
    color: white;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
