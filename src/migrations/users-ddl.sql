create table bot_users (
	chatId bigint primary key,
	userId smallint,
	constraint FK_u_users foreign key (userId) references u_users(code) on delete cascade on update cascade
)