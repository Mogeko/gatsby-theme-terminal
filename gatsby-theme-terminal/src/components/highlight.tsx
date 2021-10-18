import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { styled } from '@linaria/react';

type PrismCodeProps = {
  children: {
    props: {
      className: string;
      children: string;
    };
  };
};

const PrismCode = ({ children: { props } }: PrismCodeProps) => {
  const { className, children } = props;
  const lang = className ? className.replace(/language-/, '') : 'none';

  const Pre = styled.pre`
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
    margin: 1em 0;
  `;

  const Header = ({ language }: { language: string }) => {
    const HeaderWrap = styled.div`
      color: #fcfcfa;
      background: #011220;
      user-select: none;
      padding: 0 0.5em;
    `;

    return (
      <HeaderWrap>
        <span>{language !== 'none' ? language : 'plaintext'}</span>
      </HeaderWrap>
    );
  };

  const Codespace = styled.div`
    padding: 0.5em;
  `;

  const Line = styled.div`
    display: table-row;
  `;

  const LineNo = styled.span`
    display: table-cell;
    text-align: right;
    padding-right: 1em;
    user-select: none;
    opacity: 0.5;
  `;

  const LineContent = styled.span`
    display: table-cell;
  `;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Allow `language` to be a string
    <Highlight {...defaultProps} theme={theme} code={children} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <Header language={lang} />
          <Codespace>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Codespace>
        </Pre>
      )}
    </Highlight>
  );
};

export default PrismCode;
