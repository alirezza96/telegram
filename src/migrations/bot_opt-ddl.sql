create table bot_otp (
	id int identity(1,1),
	chatId bigint,
	code char(5) not null,
	expired_date date default getdate(),
	constraint PK_id primary key (id),
	constraint FK_bot_user_chatId foreign key (chatId) references bot_users(chatId) on delete cascade on update cascade,
)