cd /c/Users/mikes/WebstormProjects/roughnotes
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project 'journey:*' > tmp/u9/mutation.log.txt 2>&1
echo "exit=$?" >> tmp/u9/mutation.log.txt
