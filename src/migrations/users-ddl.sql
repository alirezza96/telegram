create table bot_users (
	chatId bigint primary key,
	userId smallint,
	status nvarchar(10) not null default 'member',
	branch_no smallint,
	constraint FK_u_users foreign key (userId) references u_users(code) on delete cascade on update cascade,
	constraint CHK_status check (status in ('kicked', 'member')),
	constraint Unique_userId_branch unique(userId,branch_no)
)