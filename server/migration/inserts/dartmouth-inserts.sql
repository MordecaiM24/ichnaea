INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Dartmouth College', 'Dartmouth', 'dartmouth', 'Hanover, NH', 'Rural', 237, 12, 6.2, 4556, 62430, 32410, 'Private', 1440, 1520, 1570, 32, 33, 35);
-- Deadline 1 for Dartmouth College
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'regularDecision', '2024-01-03T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Dartmouth College
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision', '2023-11-02T00:00:00.000Z');
-- Supplemental Essay 1 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'Dartmouth celebrates the ways in which its profound sense of place informs its profound sense of purpose. As you seek admission to Dartmouth’s Class of 2028, what aspects of the College’s academic program, community, and/or campus environment attract your interest? In short, why Dartmouth?', 100);
-- Supplemental Essay 2 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'There is a Quaker saying: Let your life speak. Describe the environment in which you were raised and the impact it has had on the person you are today.', 250);
-- Supplemental Essay 3 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), '“Be yourself,” Oscar Wilde advised. “Everyone else is taken.” Introduce yourself.', 250);
-- Supplemental Essay 4 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'Respond to one of the following prompts in 250 words or fewer:', 250);
-- Supplemental Essay 5 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'What excites you?', 250);
-- Supplemental Essay 6 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'Labor leader and civil rights activist Dolores Huerta recommended a life of purpose. “We must use our lives to make the world a better place to live, not just to acquire things,” she said. “That is what we are put on the earth for.” In what ways do you hope to make—or are you already making—an impact? Why? How?', 250);
-- Supplemental Essay 7 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'Dr. Seuss, aka Theodor Geisel of Dartmouth’s Class of 1925, wrote, “Think and wonder. Wonder and think.” As you wonder and think, what’s on your mind?', 250);
-- Supplemental Essay 8 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'Celebrate your nerdy side.', 250);
-- Supplemental Essay 9 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), '“It’s not easy being green…” was the frequent refrain of Kermit the Frog. How has difference been a part of your life, and how have you embraced it as part of your identity and outlook?', 250);
-- Supplemental Essay 10 for Dartmouth College
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Dartmouth College'), 'As noted in the College’s mission statement, “Dartmouth educates the most promising students and prepares them for a lifetime of learning and of responsible leadership…” Promise and potential are important aspects of the assessment of any college application, but they can be elusive qualities to capture. Highlight your potential and promise for us; what would you like us to know about you?', 250);
