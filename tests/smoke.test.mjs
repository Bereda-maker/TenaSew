import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();
const required=['app/page.tsx','app/wellness/page.tsx','app/ai/page.tsx','app/dashboard/page.tsx','db/001_initial.sql','public/manus-routes.json'];
for(const file of required)test(`required artifact: ${file}`,()=>assert.equal(fs.existsSync(path.join(root,file)),true));
test('route manifest is valid',()=>{const data=JSON.parse(fs.readFileSync(path.join(root,'public/manus-routes.json'),'utf8'));assert.ok(data.routes.length>=10);assert.ok(data.routes.every(r=>r.path.startsWith('/')))})
