import { Student, greeting} from './greeting';

test('greets fred', () => {
  const joe: Student = new Student('S1234567', 'Joe');
  expect(greeting(joe)).toBe('Hello, Joe!')
});
