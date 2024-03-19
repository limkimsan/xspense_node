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

const archiveApiKey = (btn) => {
  if (confirm('Do you really want to archive this API key?')) {
    const apiKeyId = btn.parentNode.querySelector('[name=apiKeyId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

    fetch(`/archive-api-keys/${apiKeyId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    }).then(resut => {
      console.log('==== Archive api key success ====')
    })
  }
}

const restoreApiKey = (btn) => {
  const apiKeyId = btn.parentNode.querySelector('[name=apiKeyId]').value;
  const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

  fetch(`/restore-api-keys/${apiKeyId}`, {
    method: 'POST',
    headers: {
      "x-csrf-token": csrfToken
    }
  }).then(resut => {
    console.log('==== restore api key success ====')
  })
}