const mapSeverity = (sev) => {
  switch (sev) {
    case 1:
      return 'warning';
    case 2:
    default:
      return 'error';
  }
};

const formatSuggestions = (suggestions) => {
  return (suggestions && suggestions.length ? suggestions : []).map(
    ({ messageId, desc }) => {
      return `\nSuggestion [${messageId}]: ${desc}`;
    }
  );
};

module.exports = (results) =>
  results
    .filter((f) => f.messages.length)
    .map(({ filePath, messages }) =>
      messages
        .map(({ ruleId, severity, message, line, column, suggestions }) => {
          const sev = mapSeverity(severity);
          const msg = [
            `Lint [${ruleId}] ${message}`,
            ...formatSuggestions(suggestions),
          ].join('\n');
          const cleanMessage = msg.replace(/\n/g, '%0A');
          return `::${sev} file=${filePath},line=${line},col=${column}::${cleanMessage}`;
        })
        .join('\n')
    )
    .join('\n');
