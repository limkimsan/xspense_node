const deleteCategory = (btn) => {
  if (confirm('Do you really want to delete this category?')) {
    const categoryId = btn.parentNode.querySelector('[name=categoryId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

    fetch(`/delete-categories/${categoryId}`, {
      method: 'POST',
      headers: {
        "x-csrf-token": csrfToken
      }
    });
  }
}