import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@components/Layout';
import ChatPage from '@pages/ChatPage';
import ExperimentSetupPage from '@pages/ExperimentSetupPage';
import AnalyticsPage from '@pages/AnalyticsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ExperimentSetupPage />} />
          <Route path="/testbed" element={<ChatPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
