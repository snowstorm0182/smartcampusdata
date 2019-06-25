import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
const ReactMarkdown = require('react-markdown');
const createElement = React.createElement;

let anyNavigator: any
anyNavigator = window.navigator

const SectionPreviewApp = ({
  sections
}) => <div className="SectionPreviewApp"
  style={{textAlign: 'left', }} >
  <div className="subcontent">
    <h3>Preview</h3>
    <button onClick={(e) => {anyNavigator.clipboard.writeText(
      sections.map((n)=>(
        "\n# " + n.text + "\n\n" + (n.content || "").replace(/#/g, "##")
      ))
      .join("\n\n")
      .replace(/\n#/g, "##")
    )}}>Preview</button>
    <h2>Table of contents</h2>
    <ReactMarkdown
    source={
      sections.sort((a, b)=> a.weight - b.weight)
      .map((n)=>(
        "\n\n# " + n.text + "\n\n" + (n.content || "").replace(/#/g, "##")
      ))
      .join("\n\n")
      .replace(/\n#/g, "\n#")
      .replace(
        /\b\pubId\S+\b/g,
        function(_, $1, $2) {
        let id = _.split('/')[1]
        let name = _.split('/')[2]
        // elem.scrollIntoView() someday mayby
        return '['+name+'](#publication-'+id+')'
      })
    }
    renderers={{root: ({ children }) => {
      const TOCLines = children.reduce((acc, { key, props }) => {
        if (key.indexOf('heading') !== 0) {
          return acc;
        }

        // Indent by two spaces per heading level after h1
        let indent = '';
        for (let idx = 1; idx < props.level; idx++) {
          indent = `${indent}  `;
        }
        return acc.concat([`${indent}* [${props.children[0].props.children}](#preview-${props.children[0].props.children.toLowerCase().replace(/\s/g, '')})`]);
      }, []);

      return (
        <div>
          <ReactMarkdown source={TOCLines.join("\n")} />
          {children}
        </div>
      );
    },
    heading: Heading
  }
  }/>
  </div>
</div>;

function Heading(props) {
  return createElement(`h${props.level}`,
    {...getCoreProps(props), ...{id:'preview-'+props.children[0].props.value.toLowerCase().replace(/\s/g, '')}},
    props.children)
}
function getCoreProps(props) {
  return props['data-sourcepos'] ? {'data-sourcepos': props['data-sourcepos']} : {}
}

SectionPreviewApp.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
};

SectionPreviewApp.defaultProps = {
    sections: [],
};

export default SectionPreviewApp;