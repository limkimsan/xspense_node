const deleteCategory = (btn) => {
  if (confirm('Do you really want to delete this category?')) {
    const categoryId = btn.parentNode.querySelector('[name=categoryId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    const parentElement = btn.closest('article');

    fetch(`/delete-categories/${categoryId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    })
    .then(result => {
      parentElement.parentNode.removeChild(parentElement);
    });
  }
}

const deleteTransaction = (btn) => {
  if (confirm('Do you really want to delete this transaction?')) {
    const transactionId = btn.parentNode.querySelector('[name=transactionId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    const parentElement = btn.closest('article');

    fetch(`/delete-transactions/${transactionId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    })
    .then(result => {
      parentElement.parentNode.removeChild(parentElement);
    });
  }
}

const archiveApiKey = (btn) => {
  if (confirm('Do you really want to archive this API key?')) {
    const apiKeyId = btn.parentNode.querySelector('[name=apiKeyId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    const parentElement = btn.closest('tr');

    fetch(`/archive-api-keys/${apiKeyId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    }).then(resut => {
      parentElement.parentNode.removeChild(parentElement);
    })
  }
}

const restoreApiKey = (btn) => {
  const apiKeyId = btn.parentNode.querySelector('[name=apiKeyId]').value;
  const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
  const parentElement = btn.closest('tr');

  fetch(`/restore-api-keys/${apiKeyId}`, {
    method: 'POST',
    headers: {
      "x-csrf-token": csrfToken
    }
  }).then(resut => {
    parentElement.parentNode.removeChild(parentElement);
  })
}

const deleteApiKey = (btn) => {
  if (confirm('Do you really want to delete this API key?')) {
    const apiKeyId = btn.parentNode.querySelector('[name=apiKeyId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    const parentElement = btn.closest('tr');

    fetch(`/delete-api-key/${apiKeyId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    }).then(result => {
      parentElement.parentNode.removeChild(parentElement);
    });
  }
}

const copyApiKey = (btn) => {
  const apiKey = btn.parentNode.querySelector('[id=apiKey]').innerText;
  navigator.clipboard.writeText(apiKey)
}