export const newThread = (thread) => {
  return {
    type: "NEW_THREAD",
  };
};

export const editThread = (thread) => {
  return {
    type: "EDIT_THREAD",
  };
};

export const importThreads = (threads) => {
  return {
    type: "IMPORT_THREADS",
  };
};
