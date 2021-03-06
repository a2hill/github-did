import { withHandlers } from 'recompose';

import axios from 'axios';

const API_BASE = window.location.hostname === 'github-did.com'
  ? 'https://github-did.com/api/v1'
  : 'http://localhost:5000/github-did/us-central1/main/api/v1';

export default withHandlers({
  resolveDID: ({ didResolved, snackbarMessage, set }) => async (did) => {
    set({ resolving: true });
    try {
      const { data } = await axios.get(`${API_BASE}/did/${did}`);
      didResolved({ didDocument: data });
      snackbarMessage({
        snackbarMessage: {
          message: `Resolved: ...${did.substring(32, 64)}...`,
          variant: 'success',
          open: true,
        },
      });
    } catch (e) {
      console.error(e);
      snackbarMessage({
        snackbarMessage: {
          message: 'Could not resolve DID, make sure it is checked in to github correctly.',
          variant: 'error',
          open: true,
        },
      });
    }
    set({ resolving: false });
  },
});
