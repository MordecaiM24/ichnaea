INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('University of Southern California', 'USC', 'usc', 'Los Angeles, CA', 'Urban', 226, 25, 12.5, 20790, 62726, 32569, 'Private', 1460, 1510, 1540, 32, 34, 35);
-- Deadline 1 for University of Southern California
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-02-08T00:00:00.000Z');
-- Deadline 2 for University of Southern California
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2024-01-13T00:00:00.000Z');
-- Supplemental Essay 1 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Describe how you plan to pursue your academic interests and why you want to explore them at USC specifically. Please feel free to address your first- and second-choice major selections. (Approximately 250 words)', 250);
-- Supplemental Essay 2 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Describe yourself in three words:', 3);
-- Supplemental Essay 3 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'What is your favorite snack?', 25);
-- Supplemental Essay 4 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Best movie of all time:', 25);
-- Supplemental Essay 5 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Dream job:', 25);
-- Supplemental Essay 6 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'If your life had a theme song, what would it be?', 25);
-- Supplemental Essay 7 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Dream trip:', 25);
-- Supplemental Essay 8 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'What TV show will you binge watch next? ', 25);
-- Supplemental Essay 9 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Which well-known person or fictional character would be your ideal roommate?', 25);
-- Supplemental Essay 10 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'Favorite book:', 25);
-- Supplemental Essay 11 for University of Southern California
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Southern California'), 'If you could teach a class on any topic, what would it be?', 25);
