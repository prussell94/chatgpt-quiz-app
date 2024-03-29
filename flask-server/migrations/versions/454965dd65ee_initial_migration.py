"""initial migration

Revision ID: 454965dd65ee
Revises: 
Create Date: 2024-03-11 20:08:44.617546

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '454965dd65ee'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questions', sa.Column('question_text', sa.String(length=800), nullable=True))

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('questions',
    sa.Column('question_id', sa.INTEGER(), server_default=sa.text("nextval('questions_question_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('question_topic', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('question_difficulty', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('correct_answer', sa.TEXT(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('question_id', name='questions_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('users',
    sa.Column('user_id', sa.INTEGER(), server_default=sa.text("nextval('users_user_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.PrimaryKeyConstraint('user_id', name='users_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('quizzes',
    sa.Column('quiz_id', sa.INTEGER(), server_default=sa.text("nextval('quizzes_quiz_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('quiz_name', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('quiz_description', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('start_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('end_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('quiz_id', name='quizzes_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('responses',
    sa.Column('response_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_answer', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('quiz_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.question_id'], name='responses_question_id_fkey'),
    sa.ForeignKeyConstraint(['quiz_id'], ['quizzes.quiz_id'], name='responses_quiz_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='responses_user_id_fkey'),
    sa.PrimaryKeyConstraint('response_id', name='responses_pkey')
    )
    # ### end Alembic commands ###