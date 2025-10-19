import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 16, background: '#fff1f2', color: '#b91c1c', whiteSpace: 'pre-wrap', borderRadius: 12 }}>
{String(this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}
