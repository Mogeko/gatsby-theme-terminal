import { styled } from '@linaria/react';
import { immutableColors } from './variable';

const CssBaseline = styled.div`
  :global() {
    @import url('https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css');
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

    body {
      font-family: 'Fira Code', Consolas, 'Courier New', monospace;
      font-size: 1rem;
      letter-spacing: -0.02em;
      line-height: 1.54;
      background-color: ${immutableColors.backgroundColor};
      color: ${immutableColors.fontColor};
    }
  }
`;

export default CssBaseline;
