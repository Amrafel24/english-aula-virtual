// Esquema compartido por SQLite y D1. JavaScript, sin framework de interfaz.
const { sqliteTable, text, integer, primaryKey, uniqueIndex, index } = require('drizzle-orm/sqlite-core');
const { sql } = require('drizzle-orm');
const users = sqliteTable('aula_users', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull(),
  password: text('password'), created: integer('created').notNull()
}, t => [uniqueIndex('idx_aula_users_email').on(t.email)]);
const sessions = sqliteTable('aula_sessions', {
  id: text('id').primaryKey(), user_id: text('user_id').notNull().references(()=>users.id), expires: integer('expires').notNull()
}, t=>[index('idx_aula_sessions_expires').on(t.expires)]);
const limits = sqliteTable('aula_limits', {id:text('id').primaryKey(), hits:integer('hits').notNull(), expires:integer('expires').notNull()});
const classrooms = sqliteTable('aula_classrooms', {
  id:text('id').primaryKey(), name:text('name').notNull(), teacher_id:text('teacher_id').notNull().references(()=>users.id),
  code:text('code').notNull(), joining:integer('joining').notNull().default(1), access:text('access').notNull(), created:integer('created').notNull()
}, t=>[uniqueIndex('idx_aula_classrooms_code').on(t.code),index('idx_aula_classrooms_teacher').on(t.teacher_id)]);
const members = sqliteTable('aula_members', {
  class_id:text('class_id').notNull().references(()=>classrooms.id),user_id:text('user_id').notNull().references(()=>users.id),
  active:integer('active').notNull().default(1),joined:integer('joined').notNull()
},t=>[primaryKey({columns:[t.class_id,t.user_id]}),index('idx_aula_members_user').on(t.user_id,t.active)]);
const resources = sqliteTable('aula_resources', {
  id:text('id').primaryKey(),class_id:text('class_id').notNull().references(()=>classrooms.id),kind:text('kind').notNull(),
  title:text('title').notNull(),body:text('body').notNull().default(''),material:text('material'),settings:text('settings').notNull().default('{}'),
  enabled:integer('enabled').notNull().default(0),due:integer('due'),created:integer('created').notNull(),updated:integer('updated').notNull()
},t=>[index('idx_aula_resources_class').on(t.class_id,t.kind,t.created)]);
const submissions = sqliteTable('aula_submissions', {
  id:text('id').primaryKey(),resource_id:text('resource_id').notNull().references(()=>resources.id),user_id:text('user_id').notNull().references(()=>users.id),
  body:text('body').notNull(),grade:integer('grade'),feedback:text('feedback').notNull().default(''),created:integer('created').notNull(),updated:integer('updated').notNull()
},t=>[uniqueIndex('idx_aula_submissions_resource_user').on(t.resource_id,t.user_id)]);
const messages = sqliteTable('aula_messages', {
  id:integer('id').primaryKey({autoIncrement:true}),resource_id:text('resource_id').notNull().references(()=>resources.id),
  user_id:text('user_id').notNull().references(()=>users.id),body:text('body').notNull(),created:integer('created').notNull()
},t=>[index('idx_aula_messages_resource_id').on(t.resource_id,t.id)]);
const files = sqliteTable('aula_files', {
  id:text('id').primaryKey(),resource_id:text('resource_id').notNull().references(()=>resources.id),
  submission_id:text('submission_id').references(()=>submissions.id),owner_id:text('owner_id').notNull().references(()=>users.id),
  name:text('name').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),created:integer('created').notNull()
},t=>[index('idx_aula_files_resource').on(t.resource_id)]);
const conferences = sqliteTable('aula_conferences', {
  id:text('id').primaryKey(),class_id:text('class_id').notNull().references(()=>classrooms.id),title:text('title').notNull(),
  state:text('state').notNull(),created:integer('created').notNull(),ended:integer('ended')
},t=>[index('idx_aula_conferences_class').on(t.class_id,t.created),uniqueIndex('idx_aula_conferences_active').on(t.class_id).where(sql`${t.state} = 'active'`)]);
const peers = sqliteTable('aula_peers', {
  id:text('id').primaryKey(),conference_id:text('conference_id').notNull().references(()=>conferences.id),
  user_id:text('user_id').notNull().references(()=>users.id),seen:integer('seen').notNull()
},t=>[uniqueIndex('idx_aula_peers_user').on(t.conference_id,t.user_id),index('idx_aula_peers_conference').on(t.conference_id,t.seen)]);
const signals = sqliteTable('aula_signals', {
  id:integer('id').primaryKey({autoIncrement:true}),conference_id:text('conference_id').notNull().references(()=>conferences.id),
  sender:text('sender').notNull(),receiver:text('receiver').notNull(),body:text('body').notNull(),created:integer('created').notNull()
},t=>[index('idx_aula_signals_receiver').on(t.conference_id,t.receiver,t.id)]);
module.exports={users,sessions,limits,classrooms,members,resources,submissions,messages,files,conferences,peers,signals};
