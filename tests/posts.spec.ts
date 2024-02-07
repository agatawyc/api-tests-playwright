import test, { expect } from '@playwright/test';

test('Should display all comments from postId: 1 ', async ({ request }) => {
  const response = await request.get('/comments?postId=1');
  const responseBody = (await response.json()) as Array<any>;
  expect(responseBody.every((comment) => comment.postId === 1)).toBeTruthy();
});

test('Should add new post', async ({ request }) => {
  const postData = {
    userId: 69,
    title: 'Test title',
    body: 'Test post body',
  };
  const response = await request.post('/posts', {
    data: postData,
  });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();

  expect(responseBody).toEqual(
    expect.objectContaining({ ...postData, id: expect.any(Number) }),
  );
});
